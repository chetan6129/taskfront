<template>
  
    <div class="signup-form-container">
      <h3 style="color: aliceblue">Sign Up</h3>
      <form @submit.prevent="submit" class="signup-form">
        <input
          v-model="data.name"
          type="text"
          placeholder="Username"
          class="signup-input"
          required
        />
        <input
          v-model="data.email"
          type="email"
          placeholder="Email"
          class="signup-input"
          required
        />
        <input
          v-model="data.password"
          type="password"
          placeholder="Password"
          class="signup-input"
          required
        />
        
        <button type="submit" class="submit-button" data-toggle="submit" data-placement="top" title="to create click on">
    Submit 
  </button>
        
        
      </form>
    </div>
  </template>
  
  <script>
  import { reactive, computed } from "vue";
  // import { mapActions } from 'vuex';
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  
  
  
  export default {
    name: "SignUp",
    // methods:{
    //   ...mapActions('auth',['login'])
    // },
    setup() {
      const store = useStore();
      const data = reactive({
        name: "",
        email: "",
        password: "",
      });
  
      const router = useRouter();
      const status = computed(() => store.getters["auth/isAuthenticated"]);
  
      const submit = async () => {
        const response = await fetch("https://taskmanager-api-backend.onrender.com/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        const token = responseData.token;
        // await storeToken(token);
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
  .signup-form-container {
    width: 100%;
    max-width: 400px;
    margin: 100px auto;
    padding: 30px;
    background-color: #65acf3;
    box-shadow: 0 4px 8px rgba(221, 88, 88, 0.1);
    border-radius: 10px;
    text-align: center;
  }
  
  h3 {
    margin-bottom: 20px;
    color: #f55b5b;
  }
  
  .signup-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .signup-input {
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #ADB8C2;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .signup-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
  }
  
  .submit-button {
    padding: 12px;
    font-size: 16px;
    color: #fff;
    background-color: #fa99e8;
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
  