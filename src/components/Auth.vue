<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="{ hidden: !authModalShow }">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center 
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleAuthModal" 
              @keypress="toggleAuthModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition" href="#" 
                @click.prevent="tab='login'" 
                :class="{ 'hover:text-white text-white bg-blue-600': tab === 'login',
                          'hover: text-blue-600': tab === 'register' 
                }">
                Login
              </a>
            </li>
            <li class="flex-auto text-center">
              <a class="block rounded py-3 px-4 transition" href="#" 
                @click.prevent="tab='register'"
                :class="{ 'hover:text-white text-white bg-blue-600': tab === 'register',
                          'hover: text-blue-600': tab === 'login' 
                }">
                Register
              </a>
            </li>
          </ul>

          <!-- Login Form -->
          <form v-show="tab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="email">
                Email
                <input type="email" id="email"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Enter Email" />
              </label>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="password">
                Password
                <input type="password" id="password"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password" />
              </label>
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </form>
          <!-- Registration Form -->
          <form v-show="tab === 'register'">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="name">
                Name
                <input type="text" id="name"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Enter Name" />
              </label>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="email1">
                Email
                <input type="email" id="email1"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Enter Email" />
              </label>
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="age">
                Age
                <input type="number" id="age"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded" />
              </label>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="password1">
                Password
                <input type="password" id="password1"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password" />
              </label>
            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="cfPassword">
                Confirm Password
                <input type="password" id="cfPassword"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Confirm Password" />
              </label>
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2" for="country">
                Country
                <select id="country"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded">
                  <option value="USA">USA</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Germany">Germany</option>
                </select>
              </label>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <label class="inline-block" for="checkbox">
                <input type="checkbox" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
                Accept terms of service
              </label>
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'AuthComponent',
  data() {
    return {
      tab: 'login',
    };
  },
  computed: {
    // 1. khi tính toán thì mới dùng mapGetters, còn trả về 1 giá trị thôi dùng mapState là dc
    // ...mapGetters(['getAuthModalShow']),
    // 2. cách này dùng khi trả về trùng key hoặc muốn đổi tên key
    // ...mapState({
    //   modal: 'authModalShow',
    // }),
    ...mapState(['authModalShow']),
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
  },
};
</script>
