'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { get, set } from './session-store';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const FormSchemaCustomer = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  email: z.string({
    invalid_type_error: 'Please enter an email.',
  }),
  image_url: z.string({
    invalid_type_error: 'Please enter an image URL.',
  }),
});

const FormSchemaUser = z.object({
  id: z.string(),
  name: z.string({
    invalid_type_error: 'Please enter a name.',
  }),
  email: z.string({
    invalid_type_error: 'Please enter an email.',
  }),
  password: z.string({
    invalid_type_error: 'Please enter a password.',
  }),
  img: z.string({
    invalid_type_error: 'Please enter an image URL.',
  }),
  role: z.enum(['admin', 'user'], {
    invalid_type_error: 'Please select a role.',
  }),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
      `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}

const CreateCustomer = FormSchemaCustomer.omit({ id: true });

export type StateCustomer = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createCustomer(
  prevState: StateCustomer,
  formData: FormData,
) {
  const validateFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  const { name, email, image_url } = validateFields.data;

  try {
    await sql`
        INSERT INTO customers (name, email, image_url)
        VALUES (${name}, ${email}, ${image_url})
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create Customer.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

const UpdateCustomer = FormSchemaCustomer.omit({ id: true });

export async function updateCustomer(
  id: string,
  prevState: StateCustomer,
  formData: FormData,
) {
  const validateFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer.',
    };
  }

  const { name, email, image_url } = validateFields.data;

  try {
    await sql`
        UPDATE customers
        SET name = ${name}, email = ${email}, image_url = ${image_url}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Customer.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  try {
    await sql`DELETE FROM customers WHERE id = ${id}`;
    revalidatePath('/dashboard/customers');
    return { message: 'Deleted Customer.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Customer.' };
  }
}

const CreateUser = FormSchemaUser.omit({ id: true });

export type StateUser = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    img?: string[];
    role?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: StateUser, formData: FormData) {
  const validateFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    img: formData.get('img'),
    role: formData.get('role'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create User.',
    };
  }

  const { name, email, password, img, role } = validateFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await sql`
        INSERT INTO users (name, email, password, img, role)
        VALUES (${name}, ${email}, ${hashedPassword}, ${img}, ${role})
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Create User.' };
  }
  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

const UpdateUser = FormSchemaUser.omit({ id: true, password: true });

export async function updateUser(
  id: string,
  prevState: StateUser,
  formData: FormData,
) {
  const validateFields = UpdateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    img: formData.get('img'),
    role: formData.get('role'),
  });

  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update User.',
    };
  }

  const { name, email, img, role } = validateFields.data;
  const password = formData.get('password')?.toString();

  let hashedPassword = null;
  if (password && password.length > 0) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    if (hashedPassword) {
      await sql`
          UPDATE users
          SET name = ${name}, email = ${email}, password = ${hashedPassword}, img = ${img}, role = ${role}
          WHERE id = ${id}
        `;
    } else {
      await sql`
          UPDATE users
          SET name = ${name}, email = ${email}, img = ${img}, role = ${role}
          WHERE id = ${id}
        `;
    }
  } catch (error) {
    return { message: 'Database Error: Failed to Update User.' };
  }

  if (email === (await get('email'))) {
    await set('name', name);
    await set('email', email);
    await set('img', img);
    await set('role', role);
  }

  revalidatePath('/dashboard/users');
  redirect('/dashboard/users');
}

export async function deleteUser(id: string) {
  try {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath('/dashboard/users');
    return { message: 'Deleted User.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete User.' };
  }
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
