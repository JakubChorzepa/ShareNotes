import { z } from 'zod';

export const folderSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Nazwa folderu jest wymagana')
      .max(50, 'Nazwa folderu nie może przekraczać 50 znaków'),
    password: z.string().optional(),
    isPasswordProtected: z.boolean(),
  })
  .refine(
    data => {
      if (data.isPasswordProtected) {
        return !!data.password && data.password.length > 0;
      }
      return true;
    },
    {
      path: ['password'],
      message: 'Hasło jest wymagane, jeśli folder ma być chroniony',
    },
  );

export type FolderFormValues = z.infer<typeof folderSchema>;
