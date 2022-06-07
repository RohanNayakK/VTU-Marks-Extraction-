import requests

def fetchData(usn,sem):
    querryString ="https://api.vtuconnect.in/result/"+ usn +"/"+"FEBRUARY%2FMARCH%202022"+"/"+sem
    print(querryString)
    r=requests.get(querryString ,
    headers={
        "Accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNjb3BlIjpbInVzZXIiXSwiZW1haWwiOiJuYW5kYW5AZ21haWwuY29tIn0sImlhdCI6MTU0NzMxODI5N30.ZPO8tf03azhTJ1qmgSVyGV80k9EfomXgGazdLyUC6fw",
        "Connection":"keep-alive",
        "Host": "api.vtuconnect.in",
        "If-None-Match": "W/6b4-7yoMVUN1ZELHPHQZ4mn71OZ6bpE",
        "Origin": "https://results.vtuconnect.in",
        "Referer": "https://results.vtuconnect.in/",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36"
        })
    return r.json()












