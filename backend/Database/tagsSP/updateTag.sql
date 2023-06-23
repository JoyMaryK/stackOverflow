create procedure updateTag (@tid varchar(255), @tagname varchar(255), @description varchar(255))
as 
begin
update Tags set tagname=@tagname, description=@description 
WHERE tid=@tid
end