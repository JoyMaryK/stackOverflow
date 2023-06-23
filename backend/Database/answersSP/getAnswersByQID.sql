create procedure getAnswersByQID(@qid varchar(255), @PageNumber INT)
as 
begin 
 DECLARE @PageSize INT = 2;
SELECT
    u.username,
    a.aid,
    a.answer,
    a.isPrefered,
    (
        SELECT COUNT(*) 
        FROM Votes v 
        WHERE v.aid = a.aid AND v.type = 1
    ) - (
        SELECT COUNT(*) 
        FROM Votes v 
        WHERE v.aid = a.aid AND v.type = 0
    ) AS vote_count
FROM
    users u
JOIN
    answers a ON u.uid = a.uid
WHERE
    a.qid = @qid
ORDER BY a.aid 

OFFSET (@PageNumber - 1) * @PageSize ROWS
FETCH NEXT @PageSize ROWS ONLY;
end