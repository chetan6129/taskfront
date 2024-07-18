<template>
    <div class="signin-form-container">
      <h3 style="color: aliceblue;">Sign In</h3>
      <!-- <p style="color: aliceblue;">Sample Email : s@gmail.com , Password : 123</p>  -->
      <form @submit.prevent="submit" class="signin-form">
        <input v-model="data.email" type="email" placeholder="Email" class="signin-input" />
        <input v-model="data.password" type="password" placeholder="Password" class="signin-input" />
        <button type="submit" class="submit-button">Submit</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import { reactive, computed } from "vue";
  import { useRouter } from "vue-router";
  import { useStore } from "vuex";
  
  export default {
    name: "SignIn",
    setup() {
      const store = useStore();
      const data = reactive({
        email: "",
        password: "",
      });
      const router = useRouter();
      const status = computed(() => store.getters["auth/isAuthenticated"]);
  
      const submit = async () => {
        const response = await fetch("https://taskmanager-api-backend.onrender.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        const token = responseData.token;
        localStorage.setItem("user", token);
        store.dispatch("auth/login");
        if (status.value) {
          router.push("/");
        } else {
          router.push("/signin");
        }
      };
      return {
        data,
        submit,
      };
    },
  };
  </script>
  
  <style scoped>
  
  body, html {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
  }
  
  .signin-form-container {
    width: 100%;
    max-width: 400px;
    margin: 100px auto;
    padding: 30px;
    background-color: #23292F;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    text-align: center;
  }
  
  h3 {
    margin-bottom: 20px;
    color: #333;
  }
  
  .signin-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .signin-input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
    background-color: #ADB8C2;
  }
  
  .signin-input:focus {
    outline: none;
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
  
  .submit-button {
    padding: 12px;
    font-size: 16px;
    color: #fff;
    background-color: #3d4752;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .submit-button:hover {
    background-color: #687a8d;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
  }
  </style>