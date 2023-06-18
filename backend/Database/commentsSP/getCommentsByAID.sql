create proc getCommentsByAID(@aid varchar(255))
as
begin
SELECT
    u.username,
    c.cid,
    c.comment
FROM
    users u
JOIN
    comments c ON u.uid = c.uid
WHERE
    c.aid = @aid;
end