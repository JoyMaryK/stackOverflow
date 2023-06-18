create procedure getAnswersByQID(@qid varchar(255))
as 
begin 
SELECT
    u.username,
    a.aid,
    a.answer,
    a.isPrefered
FROM
    users u
JOIN
    answers a ON u.uid = a.uid
WHERE
    a.qid = @qid;
end