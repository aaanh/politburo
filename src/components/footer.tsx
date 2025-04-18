export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-accent/25 p-4 border rounded-xl">
      &copy; Anh H. Nguyen, {year}. I am a citizen, but this site is not
      affiliated with the Government of Vietnam.
    </footer>
  );
}
