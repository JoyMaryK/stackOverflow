create procedure removePreffered( @qid varchar(255))
as 
begin
update Answers set isPrefered =0
where qid=@qid
end