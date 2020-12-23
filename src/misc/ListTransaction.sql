SELECT 
	transaction_id,
    status,
    subquery.created_at,
    subquery.updated_at,
    subquery.value,
    sender_id,
    receiver_id,
    receiver_cpf,
    cpf as sender_cpf,
    receiver_name,
    receiver_lastname,
    name as sender_name,
    lastname as sender_lastname
FROM (
  SELECT 
      transactions.id as transaction_id, 
      transactions.status,
      transactions.created_at,
      transactions.updated_at,
  	  transactions.value,
      transactions.sender_id as sender_id,
      transactions.receiver_id as receiver_id,
      cpf as receiver_cpf,
      name as receiver_name,
      lastname as receiver_lastname
  FROM (
      SELECT * FROM transactions WHERE (sender_id = '6cf10072-d873-432a-ab01-56a32ea70138' OR receiver_id = '6cf10072-d873-432a-ab01-56a32ea70138') AND created_at BETWEEN '2020-12-20' AND '2020-12-21'
  ) as transactions JOIN 'users' ON transactions.receiver_id = users.id
) as subquery JOIN users ON sender_id = users.id