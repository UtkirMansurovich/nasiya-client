Hozirda men nasiya-app projecti ustida ishlayotgan edim, ushbu project haqida siz bilan arxetekturasini qilmoqchi edim, bu project da nasiya savdo bilan shug'ullanuvchilar uchun hisob kitob dasturini ishlab chiqishdan iborat bo'ladi, Hozirda bu savdoda Asosiy kishi va uning 3 ta sherigi bor, Asosiy kishi 3 sherigini mablag'ini nasiya savdoga yo'naltirib, ularga foydasidan 50% ulush beradi, agar nasiya sotilgan mablag' qaytmasa, zarar ham 2 ga bo'linadi, ya'ni 50% mablag'ini sherigiga qaytaradi, 3 ta sherikni mablag'i alohi alohi hisob kitob qilinadi, ya'ni hammasini o'zini mijozlari bo'ladi, buni Asosiy kishi boshqaradi, Bu nasiya savdoni hisob kitobini qilish uchun hozirda excel dan foydalanadi, lekin biz ularga mijozlarga ustama (30%) qo'yib nasiyaga tovar sotib, hisob kitob qilishlari uchun yaxshiroq dastur yaratib berishimiz kerak, Nasiya savdo bilan shug'ullanuvchilarga huddi excelga o'xshab hisob kitib qilinadigan dastur kerak, ular mijozlarni har kunlik to'lovlarini mijoz bo'yicha bitta bittalab emas, balki xuddi excel dagidek, hamma to'lovlarni qilib, keyin saqlashi kerak, hozirda bilasiz, project backend uchun nest js, frontend uchun react vite ts, database uchun postgresql dan foydalanmoqdaman, mana project haqida qanaqa maslahatlar berasiz,

### Partners page uchun nima kerak:

| Nima                             | Holat |
| -------------------------------- | ----- |
| `partners.service.ts` (frontend) | ⬜    |
| `usePartners.ts` hook            | ⬜    |
| `PartnersTable.tsx`              | ⬜    |
| `AddPartnerModal.tsx`            | ⬜    |
| Partner uchun user yaratish      | ⬜    |

---

### Muhim savol:

Partner qo'shilganda **login/password** ham yaratilishi kerak edi — chunki sheriklar o'z hisobini ko'rishi mumkin.

Demak partner qo'shilganda:

```
1. users table ga username/password yaratiladi
2. partners table ga user_id bilan saqlanadi
```

---

**Shunday qilaylikmi?**

```
Partner qo'shish formasi:
├── To'liq ism
├── Telefon
├── Kiritgan mablag'
├── Username (login uchun)
├── Password (login uchun)
└── Izoh
```

Tasdiqlasangiz — `partners.service.ts` dan boshlaymiz! 🚀 => Okay.
