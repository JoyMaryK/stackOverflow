CREATE PROCEDURE GetQuestionsWithPagination
@PageNumber INT
AS
BEGIN
    DECLARE @PageSize INT = 5;

    SELECT
        Q.qid,
        Q.date,
        Q.title,
        Q.body,
        (
            SELECT T.tagname
            FROM TagsJoinQuestion TJ
            INNER JOIN Tags T ON TJ.tid = T.tid
            WHERE TJ.qid = Q.qid
            FOR JSON PATH
        ) AS tag_names
    FROM Questions Q
    WHERE Q.isDeleted = 0
    ORDER BY Q.date DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
