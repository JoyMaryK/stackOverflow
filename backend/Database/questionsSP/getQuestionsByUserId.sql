
create procedure getQuestionsByUserId(@uid varchar(255))
as 
begin
select * from Questions where uid=@uid
end