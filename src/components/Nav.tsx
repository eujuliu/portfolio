type Item = {
  label: string;
  link: string;
};

type Props = {
  active: string;
  items: Item[];
};

function Nav({ items, active }: Props) {
  function startsWith(dynamic: string, target: string) {
    const regex = new RegExp(`^${dynamic}$`);

    return regex.test(target);
  }

  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li
            className={startsWith(active, item.link) ? "active" : ""}
            key={item.label}
          >
            <a href={item.link}>{item.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { Nav };
