let detailsForm= document.getElementById('detailsForm')
let detailsFormFieldSet= document.getElementById('detailsFormFieldSet')
let detailsForm2= document.getElementById('detailsForm2')
let cancelBtn = document.getElementById("cancelBtn")

cancelBtn.addEventListener("click",()=>{
  window.location.reload();
})

detailsForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log(window.Bridge)
    window.Bridge.sendSubmit(" Rohan ")
    detailsFormFieldSet.style.display = "none"
    detailsForm2.style.display = "block" 
});


