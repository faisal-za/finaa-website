// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Categories } from './collections/Categories'
import { TrainingProgram } from './collections/TrainingPrograms'
import { Courses } from './collections/Courses'
import { Enrollments } from './collections/Enrollments'

import { Content } from './globals/Content'

import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: "/components/client/logo",
        Icon: "/components/client/icon"
      },
    }
  },
  i18n: {
    supportedLanguages: { en, ar },
    translations: {
      ar: {
        general: {
          true: "نعم",
          false: "لا يوجد",
          collections: "الكل",
          createNew: "إنشاء جديد",
          all: "كل",
          trash: "الأرشيف",
          emptyTrash: "تفريغ الأرشيف",
          noTrashResults: "لا توجد نتائج في الأرشيف",
          noResults: "لا توجد نتائج ...",
          collapse: "إغلاق"
        }
      }
    }
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Arabic',
        code: 'ar',
        rtl: true,
      },
    ],
    defaultLocale: 'en', // required
    fallback: true, // defaults to true
  },
  collections: [
    TrainingProgram,
    Courses,
    Enrollments,
    Categories,
    Media,
    Users,
  ],
  globals: [
    Content
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '487asjdfioas$fsfsfsd',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // db: vercelPostgresAdapter({
  //   pool: {
  //     connectionString: process.env.DATABASE_URI,
  //   },
  // }),
  db: sqliteAdapter({
    client: {
      url: "file:./payload.db",
    }
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
    // storage-adapter-placeholder
  ],
})
