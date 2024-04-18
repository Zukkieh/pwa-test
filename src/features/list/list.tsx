import { useEffect, useState } from "react";
import { useIsOnline } from "../../hooks/useIsOnline";
import { get } from "../../services/keyval";
import { Container } from "@mui/material";
import { getItems as getFBItems } from "../../services/firebase";
import { Item } from "../../types/list";

const List = () => {

  const [list, setList] = useState<Item[]>([]);
  const isOnline = useIsOnline();

  useEffect(() => {
    const getItems = async () => {
      if(isOnline) {
        const res = await getFBItems();
        setList(res);
      }
      else {
        get('items')
        .then(res => setList(res))
        .catch(() => setList([]));
      }
    }
    getItems();
  }, [isOnline])

  return (
    <Container sx={{
        marginTop: "100px",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
      {
        list?.length ? list?.map((item, index) => {
          return (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '500px',
                border: '1px solid black',
                borderRadius: '4px',
              }}
              key={index}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '16px'
                }}
              >
                <span>{"Name: " + item.firstName + " " + item.lastName}</span>
                <span>{"Email: " + item.email}</span>
                <span>{"Birthdate: " + Intl.DateTimeFormat("pt-BR").format(new Date(item.birthdate))}</span>
              </div>
            </div>
          )
        }) : "Empty List"
      }
    </Container>
  )
}

export default List;