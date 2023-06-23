create procedure deleteQuestion( @qid varchar(255))
as 
begin
update Questions set isDeleted =1
where qid=@qid 
end