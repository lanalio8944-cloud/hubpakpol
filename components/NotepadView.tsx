interface Props {
  id: string;
  urls: string[];
}

export default function NotepadView({ id, urls }: Props) {
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-label">Catatan URL</span>
        <span className="card-count">{urls.length} tautan</span>
      </div>

      <div className="notepad">
        <div className="notepad-bar">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
          <span className="notepad-filename">{id}.txt</span>
        </div>

        <ol className="url-list">
          {urls.map((u, i) => (
            <li key={i}>
              <span className="line-num">{i + 1}</span>
              <a
                href={u}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="url-link"
              >
                {u}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
