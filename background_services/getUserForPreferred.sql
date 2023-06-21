create proc getUsersForPreferred
AS
begin
 SELECT
    U.uid,
    A.aid,
    U.username,
    U.email,
    U.role,
    Q.title AS question_title
  FROM
    users U
  JOIN
    answers A ON U.uid = A.uid
  JOIN
    questions Q ON Q.qid = A.qid
    
    where A.isPrefered = 1 and A.emailSent=0
	end