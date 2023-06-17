create proc getCommentsByAID(@aid varchar(255))
as
begin
select * from Comments where aid=@aid
end