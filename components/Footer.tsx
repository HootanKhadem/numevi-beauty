import { navLinks, categories, siteInfo } from '@/lib/data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream/70 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <p className="font-serif text-2xl text-cream mb-3">{siteInfo.name}</p>
          <p className="text-sm leading-relaxed">
            Introducing premium, authentic beauty and personal care products with trust at
            every step.
          </p>
        </div>

        <div>
          <h4 className="text-cream text-sm uppercase tracking-wider mb-4">Navigate</h4>
          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-rose transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm uppercase tracking-wider mb-4">Categories</h4>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat.name}>
                <a href="#products" className="hover:text-rose transition-colors">{cat.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-cream text-sm uppercase tracking-wider mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>{siteInfo.email}</li>
            <li>{siteInfo.phone}</li>
            <li>{siteInfo.address}</li>
          </ul>
          <div className="flex gap-4 mt-4">
            {siteInfo.social.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="text-sm hover:text-rose transition-colors">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-12 pt-6 border-t border-cream/10 text-xs text-cream/50">
        &copy; {year} {siteInfo.name}. All rights reserved.
      </div>
    </footer>
  );
}
