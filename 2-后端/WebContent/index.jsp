<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
</head>
<body>
 <c:forEach items="${list}" var="garbage" >
    名称：${garbage.name}    
   类别：${garbage.category}<br>
 
 </c:forEach>

</body>
</html>