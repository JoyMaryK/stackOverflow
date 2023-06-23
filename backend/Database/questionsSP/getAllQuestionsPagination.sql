
CREATE PROCEDURE GetQuestionsWithPagination
@PageNumber INT
AS
BEGIN
    DECLARE @PageSize INT = 3;

    SELECT
        Q.qid,
        Q.date,
        Q.title,
        Q.body,
        ISNULL(AC.answer_count, 0) AS answer_count,
        (
            SELECT T.tagname
            FROM TagsJoinQuestion TJ
            INNER JOIN Tags T ON TJ.tid = T.tid
            WHERE TJ.qid = Q.qid
            FOR JSON PATH
        ) AS tag_names
    FROM Questions Q
    LEFT JOIN
    (
        SELECT qid, COUNT(*) AS answer_count
        FROM Answers
        GROUP BY qid
    ) AC ON Q.qid = AC.qid
    WHERE Q.isDeleted = 0
    ORDER BY Q.date DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END

