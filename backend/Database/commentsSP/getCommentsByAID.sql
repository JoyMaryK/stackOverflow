create proc getCommentsByAID(@aid varchar(255)@PageNumber INT)
AS
BEGIN
    DECLARE @PageSize INT = 5;

    SELECT
        u.username,
        c.cid,
        c.comment
    FROM
        users u
    JOIN
        comments c ON u.uid = c.uid
    WHERE
        c.aid = @aid
    ORDER BY c.cid 

    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
