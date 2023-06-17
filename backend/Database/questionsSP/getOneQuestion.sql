create procedure getOneQuestion(@qid varchar(255))
as 
begin
SELECT
    Q.date,
    Q.title,
    Q.body,
    (
        SELECT T.tagname
        FROM TagsJoinQuestion TJ
        INNER JOIN Tags T ON TJ.tid = T.tid
        WHERE TJ.qid = @qid
        FOR JSON PATH
    ) AS tag_names
FROM Questions Q
where Q.isDeleted =0 and qid=@qid
end