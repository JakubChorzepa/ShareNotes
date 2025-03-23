import * as z from 'zod';

export const addNoteSchema = z.object({
  title: z
    .string()
    .min(1, 'Tytuł jest wymagany')
    .max(100, 'Tytuł może mieć maksymalnie 100 znaków'),
  file: z
    .instanceof(File)
    .refine(
      file => file.type === 'application/pdf',
      'Plik musi być w formacie PDF',
    )
    .refine(
      file => file.size <= 5 * 1024 * 1024,
      'Plik nie może przekraczać 5MB',
    ),
});

export type AddNoteSchema = z.infer<typeof addNoteSchema>;
