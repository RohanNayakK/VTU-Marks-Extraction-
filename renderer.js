let detailsForm= document.getElementById('detailsForm')
let detailsFormFieldSet= document.getElementById('detailsFormFieldSet')
let detailsForm2= document.getElementById('detailsForm2')
let cancelBtn = document.getElementById("cancelBtn")
let loader = document.getElementById("loadingContainer")

cancelBtn.addEventListener("click",()=>{
  window.location.reload();
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
    let collegeCode=document.getElementById("collegeCodeInput")
    let year=document.getElementById("syear")
    let branch = document.getElementById("sbranch")
    let startusn= document.getElementById("sfusn")
    let lastusn = document.getElementById("slusn")
    let path =document.getElementById("folderPath")

    let formDataObj={
      collegeCode : collegeCode.value,
      year:year.value,
      branch:branch.value,
      startusn:startusn.value,
      lastusn:lastusn.value,
      path:path.value
    }

    window.Bridge.sendSubmit(formDataObj)
  
});


