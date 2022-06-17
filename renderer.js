let detailsForm= document.getElementById('detailsForm')
let detailsFormFieldSet= document.getElementById('detailsFormFieldSet')
let detailsForm2= document.getElementById('detailsForm2')
let backBtn = document.getElementById("backBtn")
let loader = document.getElementById("loadingContainer")

const collegeCode=document.getElementById("collegeCodeInput")
const year=document.getElementById("syear")
const branch = document.getElementById("sbranch")
const startusn= document.getElementById("sfusn")
const lastusn = document.getElementById("slusn")
const path =document.getElementById("folderPath")


backBtn.addEventListener("click",()=>{
  detailsFormFieldSet.style.display = "block"
  detailsForm2.style.display = "none"
})


//start screen form
detailsForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  detailsFormFieldSet.style.display = "none"
  detailsForm2.style.display = "block" 
});


detailsForm2.addEventListener("submit",(e)=>{
    e.preventDefault()
    loader.style.display ="flex"
    let formDataObj={
      collegeCode : collegeCode.value,
      year:String(year.value),
      branch:branch.value,
      startusn:String(startusn.value),
      lastusn:String(lastusn.value),
      path:path.value
    }

    window.Bridge.sendSubmit(formDataObj)
  
});

collegeCode.addEventListener("input",(event)=>{
  event.target.value = event.target.value.toUpperCase()
})

branch.addEventListener("input",(event)=>{
  event.target.value = event.target.value.toUpperCase()
})
