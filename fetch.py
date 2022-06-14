import requests
import openpyxl
from datetime import date

usnList=[]

def generateUSN(collegecode,year,branch,startusn,endusn):
    for i in range(startusn,endusn+1):
        if(i<10):
            usnList.append(collegecode+year+branch+"00"+str(i))
        elif(i<100):
            usnList.append(collegecode+year+branch+"0"+str(i))
        else:
            usnList.append(collegecode+year+branch+str(i))

#function call to genearate USN List
generateUSN("4CB","19","IS",1,5)
print(usnList)


rowCount=5
firstTime=True
subcounter=0

for usn in usnList:
    querryString ="https://api.vtuconnect.in/result/"+usn
    r=requests.get(querryString ,
    headers={
    "Accept": "application/json",
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNjb3BlIjpbInVzZXIiXSwiZW1haWwiOiJuYW5kYW5AZ21haWwuY29tIn0sImlhdCI6MTU0NzMxODI5N30.ZPO8tf03azhTJ1qmgSVyGV80k9EfomXgGazdLyUC6fw",
    "Host": "api.vtuconnect.in",
     })
    data=r.json()
    wb_obj = openpyxl.load_workbook("ExcelFSTemplate.xlsx")
    #sheet_obj = wb_obj.active
    todays_date = date.today()


 
    
    
     
    
    for sheet in wb_obj.sheetnames:
        
        print(sheet) 
        sheet_obj=wb_obj[sheet]
        for i in data:
            if(int(i["resultMonthYear"].split()[1])==todays_date.year):
                if(firstTime):
                    examNameCell= sheet_obj.cell(row = 1, column = 1)
                    examNameCell.value=i["resultMonthYear"]
                    subNameCell= sheet_obj.cell(row = 2, column = 3)
                    subNameCell.value =i["subjects"][subcounter]["subjectName"]
                    subCodeCell= sheet_obj.cell(row = 3, column = 3)
                    subCodeCell.value=i["subjects"][subcounter]["subjectCode"]
                    firstTime=False
                    nameCell = sheet_obj.cell(row = rowCount, column = 1)
                usnCell = sheet_obj.cell(row = rowCount, column = 2)
                nameCell.value = i["name"]
                usnCell.value = i["usn"]
                iamarksCell = sheet_obj.cell(row = rowCount, column = 3)
                iamarksCell.value = i["subjects"][subcounter]["iaMarks"]
                emarksCell = sheet_obj.cell(row = rowCount, column = 4)
                emarksCell.value = i["subjects"][subcounter]["eMarks"]
                totalmarksCell = sheet_obj.cell(row = rowCount, column = 5)
                totalmarksCell.value = i["subjects"][subcounter]["total"]

                resultsCell = sheet_obj.cell(row = rowCount, column = 6)
                resultsCell.value = i["subjects"][subcounter]["result"]
    print("Sheet Change")
    subcounter=subcounter+1
    firstTime=True
    rowCount=rowCount+1
        
        
wb_obj.save("ExcelFSTemplate.xlsx") 

        
    







 











