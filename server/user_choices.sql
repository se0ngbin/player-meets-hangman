delete from "Interest";
delete from "MakeOrBreakPossibleAnswer";
delete from "MakeOrBreakQuestion";

CREATE OR REPLACE FUNCTION new_question(in question varchar, in answers varchar[]) RETURNS void as
$BODY$
DECLARE
    q_id UUID;
    answer varchar;
BEGIN
    insert into "MakeOrBreakQuestion" (text) values (question) returning id into q_id;

    foreach answer in array answers
    LOOP
        insert into "MakeOrBreakPossibleAnswer" (mobqid, text) values (q_id, answer);
    END LOOP;

END;
$BODY$ 
LANGUAGE plpgsql VOLATILE;

--  add genders, interests and questions here in the format provided

-- genders --

insert into "Gender" (id, name) values (0, 'Male');
insert into "Gender" (id, name) values (1, 'Female');
insert into "Gender" (id, name) values (2, 'M2F Transsexual');
insert into "Gender" (id, name) values (3, 'F2M Transsexual');
insert into "Gender" (id, name) values (4, 'Non-binary');
insert into "Gender" (id, name) values (5, 'Not applicable');

-- interests -- 

insert into "Interest" (name) values ('sex');
insert into "Interest" (name) values ('more sex');

-- make or break questions --

select new_question('do you like i scream?', array['yes', 'no', 'i scream too']);
