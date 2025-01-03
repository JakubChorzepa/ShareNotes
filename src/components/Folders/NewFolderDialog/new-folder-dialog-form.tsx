'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';

import { FolderFormValues, folderSchema } from './validation';

type NewFolderDialogFormProps = {
  onSubmit: (data: FolderFormValues) => void;
};

export const NewFolderDialogForm = ({ onSubmit }: NewFolderDialogFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FolderFormValues>({
    resolver: zodResolver(folderSchema),
  });

  const isPasswordProtected = watch('isPasswordProtected');

  useEffect(() => {
    setValue('isPasswordProtected', false);
  }, [setValue]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input placeholder="Nazwa folderu" {...register('name')} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Controller
          name="isPasswordProtected"
          control={control}
          render={({ field }) => (
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          )}
        />
        <label htmlFor="isPasswordProtected">Zabezpiecz folder hasłem</label>
      </div>
      {isPasswordProtected && (
        <div>
          <Input
            type="password"
            placeholder="Hasło"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
      )}
      <div className="flex justify-center gap-2">
        <Button type="submit">Dodaj</Button>
      </div>
    </form>
  );
};
