let detailsForm= document.getElementById('detailsForm')
let detailsFormFieldSet= document.getElementById('detailsFormFieldSet')

let detailsForm2= document.getElementById('detailsForm2')


detailsForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    detailsFormFieldSet.style.display = "none"
    detailsForm2.style.display = "block"
    
})