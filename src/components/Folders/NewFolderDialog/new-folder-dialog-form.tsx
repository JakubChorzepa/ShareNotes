'use client';

import autoAnimate from '@formkit/auto-animate';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
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
  const animateParent = useRef(null);

  const isPasswordProtected = watch('isPasswordProtected');

  useEffect(() => {
    setValue('isPasswordProtected', false);
  }, [setValue]);

  useEffect(() => {
    animateParent.current && autoAnimate(animateParent.current);
  }, [animateParent]);

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(onSubmit)}
      ref={animateParent}
    >
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
            <Checkbox
              id="isPasswordProtectedCheckbox"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          )}
        />
        <label
          htmlFor="isPasswordProtectedCheckbox"
          className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Zabezpiecz folder hasłem
        </label>
      </div>
      {isPasswordProtected && (
        <>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="password">Hasło</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Wpisz hasło"
                  {...field}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <label htmlFor="confirmPassword">Potwierdź hasło</label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Potwierdź hasło"
                  {...field}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
          />
        </>
      )}
      <div className="flex justify-center gap-2">
        <Button type="submit">Dodaj</Button>
      </div>
    </form>
  );
};
