<template>
  <div class="flex flex-col md:flex-row min-h-screen">
    <!-- Left Side (Desktop only) -->
    <div
      class="hidden md:flex md:w-1/2 bg-purple-100 flex-col items-center justify-center p-10 rounded-r-[40px]"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-2 mb-8">
        <img
          src="https://iili.io/KtXTG99.png"
          alt="Team Achieve Logo"
          class="w-12 h-12"
        />
        <h1 class="text-2xl font-semibold text-gray-700">Team Achieve</h1>
      </div>

      <!-- People Image -->
      <div class="rounded-3xl overflow-hidden mb-8 w-full max-w-md">
        <img
          src="https://iili.io/KtWUGPs.md.png" 
          alt="Team Achieve Illustration"
          class="object-cover w-full h-auto"
        />
      </div>

      <!-- Caption -->
      <div class="text-center px-4">
        <h2 class="text-xl font-bold" style="color: #61227D;">Team Achieve</h2>
        <p class="text-gray-600 font-medium text-base">
          Your perfect solution for funding your desires
        </p>
      </div>
    </div>

    <!-- Right Side -->
    <div
      class="w-full md:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 py-10 md:py-0"
    >
      <!-- Mobile Logo (Mobile only) -->
      <div class="flex md:hidden items-center justify-center mb-8">
        <img
          src="https://iili.io/KtXTG99.png"
          alt="Team Achieve Logo"
          class="w-16 h-16"
        />
      </div>

      <!-- Welcome Back -->
      <h2 class="text-3xl font-bold mb-2 text-center md:text-left" style="color: #61227D;">
        Welcome Back
      </h2>
      <p class="text-gray-600 mb-8 text-center md:text-left">
        Enter your email address and password to access your account.
      </p>

      <form class="w-full max-w-md space-y-5">
        <!-- Email -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">
            Email Address <span class="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
            style="--tw-ring-color: #61227D;"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-gray-700 font-semibold mb-1">
            Password <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2"
              style="--tw-ring-color: #61227D;"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          <div class="text-right mt-1">
            <a href="#" class="text-sm font-medium hover:underline" style="color: #61227D;">
              Forgot Password?
            </a>
          </div>
        </div>

        <!-- Remember Me -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input id="remember" type="checkbox" class="mr-2" />
            <span class="text-gray-700">Remember me</span>
          </label>
        </div>

        <!-- Sign In Button -->
        <button
          type="submit"
          class="w-full text-white py-2 rounded-md font-semibold transition"
          style="background-color: #61227D;"
        >
          Sign in
        </button>

        <!-- Sign Up -->
        <p class="text-center mt-4 text-gray-700 text-sm">
          Don't have an account?
          <a href="#" class="font-semibold hover:underline" style="color: #61227D;">
            Sign up
          </a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const showPassword = ref(false)
</script>
