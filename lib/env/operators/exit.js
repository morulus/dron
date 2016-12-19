export default function exit(message) {
  console.log(message||'Cenceled by user');
  process.exit(0);
}
