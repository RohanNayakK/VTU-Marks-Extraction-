from tkinter import *
from fetch import fetchData 
from PIL import ImageTk, Image




root = Tk()
root.geometry("1000x1000")
root.title('VTU Marks Extraction')
root.state("zoomed")



frame = Frame(root, width=300, height=300)
frame.pack()
frame.place(anchor='center', relx=0.5, rely=0.5)

imgbuffer =Image.open("bg.png")
imgbuffer = imgbuffer.resize((300, 300))
img = ImageTk.PhotoImage(imgbuffer)
label = Label(frame, image = img)
label.pack()


label_0 =Label(root,text="Generate Excel", width=20,font=("bold",20))
label_0.place(x=90,y=60)

label_1 =Label(root,text="Student Starting USN :", width=20,font=("bold",10))
label_1.place(x=80,y=130)

label_2 =Label(root,text="Student Ending USN :", width=20,font=("bold",10))
label_2.place(x=80,y=160)

entry_2=Entry(root)
entry_2.place(x=240,y=160)


entry_1=Entry(root)
entry_1.place(x=240,y=130)


label_4 =Label(root,text="Exam Type :", width=20,font=("bold",10))
label_4.place(x=70,y=190)


examTypeVar=StringVar()

Radiobutton(root,text="Jul/Aug",padx= 5, variable= examTypeVar, value="JULY%2FAUGUST").place(x=235,y=190)
Radiobutton(root,text="Feb/Mar",padx= 20, variable= examTypeVar, value="FEBRUARY%2FMARCH").place(x=350,y=190)


label_5=Label(root,text="Semester :",width=20,font=("bold",10))
label_5.place(x=70,y=220)

list_of_sem=["1","2","3","4","5","6","7","8"]

semVal=StringVar()
droplist=OptionMenu(root,semVal, *list_of_sem)
droplist.config(width=2)
semVal.set('Sem')
droplist.place(x=240,y=220)

myText=StringVar()
myText.set("")

finalData=[]
messageLabel = Label(root,textvariable=myText ,fg='red',font=("bold",10)).place(x=90,y=270,)
def button_clicked():
    start_usn=entry_1.get()
    end_usn=entry_2.get()
    exam_type=examTypeVar.get()
    sem=semVal.get()
    if(start_usn=="" or end_usn=="" or semVal==""):
        print("cannot submit blank")
        myText.set("Cannot submit blank")
        return
    
    usnconst = start_usn[0:7]
    usnStartIndex=int(start_usn[8:10])
    usnEndIndex=int(end_usn[8:10])
    for x in range(usnStartIndex,usnEndIndex):
        currentUSN=""
        try:
            if(x<10):
                currentUSN=usnconst+"00"+str(x)
            elif(x<100):
                currentUSN=usnconst+"0"+str(x)
            else:
                currentUSN=usnconst+str(x)
            fetchedData=fetchData(currentUSN,sem)
            finalData.append(fetchedData)
        except:
            print("Error")
        
    print(finalData)


Button(root, text='Generate' , command=button_clicked,width=20,bg="black",fg='white').place(x=180,y=300,)

root.mainloop()