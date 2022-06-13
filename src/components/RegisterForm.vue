<template>
    <div class="text-white text-center font-bold p-4 mb-4" v-if="reg_show_alert" 
    :class="reg_alert_variant">
        {{ reg_alert_msg }}
    </div>
    <vee-form :validation-schema="registerSchema" @submit="register" :initial-values="userData">
        <div class="mb-3">
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label class="mb-2" for="name">
                Name
                <vee-field type="text" id="name" name="name"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                    duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Name" />
                <ErrorMessage class="text-red-600" name="name" />
            </label>
        </div> 
    <div class="mb-3">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="mb-2" for="email">
            Email
            <vee-field type="email" id="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            <ErrorMessage class="text-red-600" name="email" />
        </label>
    </div>
    <div class="mb-3">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="mb-2" for="age">
            Age
            <vee-field type="number" id="age" placeholder="Age" name="age"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded" />
            <ErrorMessage class="text-red-600" name="age" />
        </label>
    </div>
    <!-- Password --> <!-- example for many errors  -->
    <div class="mb-3">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="mb-2" for="password">
            Password
            <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                <input type="password" id="password"
                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 
                    transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Password" v-bind="field" />
                <div class="text-red-600" v-for="error in errors" :key="error">
                    {{ error }}
                </div>
            </vee-field>
        </label>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="mb-2" for="confirm_password">
            Confirm Password
            <vee-field type="password" id="confirm_password" name="confirm_password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" />
            <ErrorMessage class="text-red-600" name="confirm_password" />
        </label>
    </div>
    <!-- Country -->
    <div class="mb-3">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="mb-2" for="country">
            Country
            <vee-field id="country" name="country" as="select"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antarctica">Antarctica</option>
            </vee-field>
            <ErrorMessage class="text-red-600" name="country" />
        </label>
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
        <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
        <label class="inline-block" for="checkbox">
            Accept terms of service
            <vee-field type="checkbox" name="tos" value="1"
                class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
            <ErrorMessage class="text-red-600 block" name="tos" />
        </label>
    </div>
    <button type="submit" :disabled="reg_in_submission"
        class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
        hover:bg-purple-700">
        Submit
    </button>
    </vee-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      registerSchema: {
        // name là thuộc tính name trong input đó
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:100',
        confirm_password: 'password_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
      },
      userData: {
        country: 'USA',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Please wait! Your account is being created.',
    };
  },
  methods: {
    register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Please wait! Your account is being created.';

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created.';
      console.log(values);
    },
  },
};
</script>
