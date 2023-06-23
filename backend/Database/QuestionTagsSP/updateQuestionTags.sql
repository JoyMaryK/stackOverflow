
create proc updateQuestionTags (@tid varchar(255), @qid varchar(255))
as 
begin
delete from TagsJoinQuestion where qid=@qid
insert into TagsJoinQuestion(tid, qid)
values (@tid, @qid)
end