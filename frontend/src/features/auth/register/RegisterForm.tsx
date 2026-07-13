'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';

import { AuthService } from '@/services/auth/auth.service';

type UserRole = 'TENANT' | 'LANDLORD';

const counties = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Kiambu',
  'Uasin Gishu',
  'Machakos',
  'Kajiado',
  'Nyeri',
  'Meru',
  'Kakamega',
  'Kilifi',
  'Bungoma',
  'Kericho',
  'Embu',
  'Laikipia',
];

export default function RegisterForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    county: '',
    town: '',
    password: '',
    confirmPassword: '',
    role: 'TENANT' as UserRole,
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (loading) return;

    const town = form.town.trim();

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.county ||
      !town ||
      !form.password
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const phoneRegex =
      /^(\+254|0)[17]\d{8}$/;

    if (!phoneRegex.test(form.phone.trim())) {
      toast.error(
        'Please enter a valid Kenyan phone number.',
      );
      return;
    }

    if (form.password.length < 6) {
      toast.error(
        'Password must be at least 6 characters.',
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await AuthService.register({
        fullName: form.fullName.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        county: form.county,
        town,
        password: form.password,
        role: form.role,
      });

      toast.success(
        'Account created successfully.',
      );

      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            'Registration failed.',
        );
      } else {
        toast.error(
          'Something went wrong. Please try again.',
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        autoComplete="name"
        placeholder="Full Name"
        className="w-full rounded-xl border p-3"
        value={form.fullName}
        onChange={(e) =>
          setForm({
            ...form,
            fullName: e.target.value,
          })
        }
      />

      <input
        autoComplete="email"
        type="email"
        placeholder="Email Address"
        className="w-full rounded-xl border p-3"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        autoComplete="tel"
        placeholder="Phone Number"
        className="w-full rounded-xl border p-3"
        value={form.phone}
        onChange={(e) =>
          setForm({
            ...form,
            phone: e.target.value,
          })
        }
      />

      <select
        className="w-full rounded-xl border p-3"
        value={form.county}
        onChange={(e) =>
          setForm({
            ...form,
            county: e.target.value,
          })
        }
      >
        <option value="">
          Select County
        </option>

        {counties.map((county) => (
          <option
            key={county}
            value={county}
          >
            {county}
          </option>
        ))}
      </select>

      <input
        placeholder="Town / City"
        className="w-full rounded-xl border p-3"
        value={form.town}
        onChange={(e) =>
          setForm({
            ...form,
            town: e.target.value,
          })
        }
      />

      <select
        className="w-full rounded-xl border p-3"
        value={form.role}
        onChange={(e) =>
          setForm({
            ...form,
            role: e.target.value as UserRole,
          })
        }
      >
        <option value="TENANT">
          I'm Looking for a House
        </option>

        <option value="LANDLORD">
          I'm a Landlord
        </option>
      </select>

      <input
        autoComplete="new-password"
        type="password"
        placeholder="Password"
        className="w-full rounded-xl border p-3"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <input
        autoComplete="new-password"
        type="password"
        placeholder="Confirm Password"
        className="w-full rounded-xl border p-3"
        value={form.confirmPassword}
        onChange={(e) =>
          setForm({
            ...form,
            confirmPassword: e.target.value,
          })
        }
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-sky-600 p-3 font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading
          ? 'Creating Account...'
          : 'Create Account'}
      </button>
    </form>
  );
}