create proc deleteTag(@tid varchar(255))
as 
begin
update Tags set isDeleted = 1 where tid=@tid
end