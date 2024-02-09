// query for creating the supabase rpc for fetching all the pending messages for a user for all of its chats

/* 
  create
or replace function get_unread_counts (user_id integer)
RETURNS TABLE (
    "SupabaseUsers_id" bigint,
    unread_count bigint
) AS $$
BEGIN
    RETURN QUERY (
        SELECT
  senders."id",
  COUNT("SupabaseMessages"."senderId") AS unread_count
FROM
  (
    SELECT DISTINCT "id","Name"
    FROM "SupabaseUsers"
    where "id" != user_id
  ) AS senders
LEFT JOIN
  "SupabaseMessages"
ON
  senders."id" = "SupabaseMessages"."senderId" AND
  "SupabaseMessages"."receiverId" = user_id AND
  "SupabaseMessages"."isRead" = false
GROUP BY
  senders."id"
    );
END;
$$ language plpgsql;
*/


// query to create a function that gets latest messages of each chat

/* 
  CREATE OR REPLACE FUNCTION get_latest_messages(user_id integer)
RETURNS TABLE (
    "other_id" bigint,
    "Id" bigint,
    SenderId bigint,
    ReceiverId bigint,
    "Content" TEXT,
    "Created_At" TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY (
        SELECT
            CASE
                WHEN "senderId" = 1 THEN "receiverId"
                WHEN "receiverId" = 1 THEN "senderId"
            END AS userId,
            "id",
            "senderId",
            "receiverId",
            "content",
            "created_at"
        FROM (
            SELECT
                "id",
                "senderId",
                "receiverId",
                "content",
                "created_at",
                ROW_NUMBER() OVER (PARTITION BY CASE
                                    WHEN "senderId" = 1 THEN "receiverId"
                                    WHEN "receiverId" = 1 THEN "senderId"
                                    END
                                    ORDER BY "created_at" DESC) AS row_num
            FROM "SupabaseMessages"
            WHERE "senderId" = user_id OR "receiverId" = user_id
        ) AS latest_messages
        WHERE row_num = 1
    );
END;
$$ LANGUAGE plpgsql;

*/