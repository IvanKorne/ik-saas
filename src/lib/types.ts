type getDataProps = {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
};

type DashboardProps = {
  children: React.ReactNode;
};

type StripeProps = {
  priceId: string;
  domainUrl: string;
  customerId: string;
};

type NoteDataProps = {
  userId: string;
  noteId: string;
};
