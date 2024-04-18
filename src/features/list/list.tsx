import { useEffect, useState } from "react";
import { useIsOnline } from "../../hooks/useIsOnline";
import { get, update } from "../../services/keyval";
import { Container, Stack } from "@mui/material";
import { getItems as getFBItems } from "../../services/firebase";
import { Item } from "../../types/list";

const List = () => {

  const [list, setList] = useState<Item[]>([]);
  const isOnline = useIsOnline();

  useEffect(() => {
    const getItems = async () => {
      let fBItems: Item[] = [];
      if (isOnline) {
        fBItems = await getFBItems();
      }
      get('items')
        .then(async (response) => {
          if (response?.length) {
            if (isOnline) {
              const items = [
                ...fBItems,
                ...(response?.filter(item => item.isNotSync))
              ]
              setList(items);
              await update("items", items);
            }
            else {
              setList(response);
            }
          } else {
            setList(fBItems)
            if (isOnline)
              await update("items", fBItems);
          }
        })
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
            <Stack
              direction="column"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
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
                <span>{"Sync: " + (item?.isNotSync ? "No" : "Yes")}</span>
              </div>
            </Stack>
          )
        }) : "Empty List"
      }
    </Container>
  )
}

export default List;