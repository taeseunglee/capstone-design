# capstone-design

## 과제 6
### 파일 위치
/web6.js : 과제 6을 위한 js code
/data.txt : 데이터 저장되는 곳

### Query Examples
ip:port/update?api_key=fsdfs&field1=123 : data.txt 에 YYYYMMDD,HH:mm,{filed1} 형식으로
저장
ip:port/get : data.txt에 있는 모든 값 출력

## 과제 7
/web7.js : data를 저장하고 csv로 다운로드 받을 수 있는 js code

### Query Examples
데이터 저장 : ip:port/log?device=202&unit=3&type=T&value=24.2&seq=34
csv로 다운로드 : ip:port/download
