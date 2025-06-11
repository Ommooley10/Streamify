import { Mail, Phone, Info, Heart } from "lucide-react";

const HelpPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="card bg-base-200 shadow-xl rounded-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
            <Info className="w-6 h-6" />
            Help & Support
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Welcome to the help section of <strong>Streamify</strong>. Below you'll find all the information you need.
          </p>

          <div className="divider" />

          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">👨‍💻 Creator</h2>
              <p>Developed with ❤️ by <strong>Om Mooley</strong></p>
            </div>

            <div>
              <h2 className="font-semibold">📂 Project Repository</h2>
              <a
                href="https://github.com/Ommooley10/Streamify"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-primary underline"
              >
                https://github.com/Ommooley10/Streamify
              </a>
            </div>

            <div>
              <h2 className="font-semibold">📞 Contact</h2>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>9421805501</span>
              </p>
              <p className="flex items-center gap-2 mt-1">
                <Mail className="w-4 h-4" />
                <span>omvikas1001@gmail.com</span>
              </p>
            </div>

            <div>
              <h2 className="font-semibold">❓ What is Streamify?</h2>
              <p>
                Streamify is a modern messaging/chat application inspired by
                WhatsApp, built with <strong>React</strong>, <strong>TailwindCSS</strong>, <strong>DaisyUI</strong>, <strong>React Query</strong>, and <strong>Node.js</strong> for seamless real-time communication and a clean UI.
              </p>
            </div>

            <div>
              <h2 className="font-semibold">📌 Need more help?</h2>
              <p>
                If you're experiencing issues, feel free to reach out via phone or submit issues on the GitHub repo.
              </p>
            </div>
          </div>

          <div className="divider" />

          <p className="text-sm text-center text-gray-500">
            Made with <Heart className="inline w-4 h-4 text-red-500 mx-1" /> by Om Mooley
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
