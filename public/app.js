document.addEventListener("DOMContentLoaded",function(){
    const singupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");
    const messageForm=document.getElementById("messageForm");
    if(singupForm) {
      singupForm.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const username =document.getElementById("username").value;
        const password =document.getElementById("password").value;
        try{

          const response = await fetch("/auth/signup",{
            method:"POST",
            headers:{
               "Content-Type":"application/json"
            },
            body:JSON.stringify({username,password}),
          });
          if(response.status==201){
           alert("sign up succesfully");
           window.location.href="login.html";

          }else{
          const error = await response.json();
          alert("sign up Failed");
        
          }
        }catch(e){
          alert("sign up Failed",e);
        }
    });
  } 
  if(loginForm){
        loginForm.addEventListener("submit",async(e)=>{
            e.preventDefault();
            const username =document.getElementById("username").value;
            const password =document.getElementById("password").value;
           try{
    
            const response = await fetch("/auth/login",{
                method:"POST",
                headers:{
                   "Content-Type":"application/json"
                },
                body:JSON.stringify({username,password}),
            });
            if(response.ok){
              const data = await response.json();
              localStorage.setItem("token",data.token);
              window.location.href="chat.html";
    
            }else{
             const error = await response.json();
             alert("Login Failed",error);
        
            }
           }catch(e){
            alert("Login Failed",e);
           }
        }); 
    }    
    if (messageForm){
            const socket=io({
                auth:{
                    token:localStorage.getItem("token"),
                },
            });
            socket.on("message",(message)=>{
                const messageElement = document.createElement("div");
                messageElement.textContent=`${message.user}:${message.text}`;
                messagesDiv.appendChild(messageElement);
            });

            messageForm.addEventListener("submit",(e)=>{
                e.preventDefault();
                const messageInput = document.getElementById("message");
                socket.emit("message",messageInput.value);
                messageInput.value="";
            });
        
    
    }
});

// chatbox-> BACKEND -> CHATBOX 