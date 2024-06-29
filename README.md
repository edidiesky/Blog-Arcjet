# DEVELOPMENT PROCESS OF ENVITAB BLOG SHOWCASING ARCJET.IO INFLUENCE

Welcome to the demonstration of Building a Secure Next.js Blog with Next-Auth, Fly.io and Arcjet - HackMD hackmd.io

## DEVELOPING OF NEXT AUTH

In providing the authentication, we are making use of Nextauth

### Developing of next auth api

**Api route:/api/[...nextauth]/route.js **

```json
import { handlers } from "@/auth";
export const { GET, POST } = handlers;

```

### auth file and middleware

So these files gives us access to the next-auth social providers such as google and github and they also retail the cookies for us which is used for authentication.
**/auth.jsx**

```json
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});

```

**/middleware.jsx**

```json
export { auth as middleware } from "@/auth";

```

## DEVELOPING OF PRISMA SCHEMA AND NEXT API HANDLER FOR COMMENT SYSTEM


So we need to make use of prisma, which is an ORM tool for interacting with our data-base which is MONGO-DB. So the first steps, is installing the prisma packages

```json
npm i @next-auth/prisma-adapter primsa @prisma/client --legacy-peer-deps

```
### prisma schema
After installing the prisma dependencies in our project, We move onto creating the prisma schema which models the structure of our comment system:

```json
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Comment {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  body      String?
  username  String?
  userimage String?
  postId  String?
  createdAt DateTime @default(now())
}

```

### Testing the image using PIXLAB API.

```http
  POST /api/nsfw
```

| Parameter | Type     | Description                         |
| :-------- | :------- | :---------------------------------- |
| `img`     | `string` | **Required**.User's inputed image   |
| `key`     | `string` | **Required**. Key form PIXLAB's api |

**Response:**

- Status: 200 OK
- Body:
  ```json
  {
    "data": {
      "status": "pixLab_status",
      "score": "pixlab_score"
    }
  }
  ```

### Example Request

```http
POST /api/nsfw
Content-Type: application/json

{
  "img": "user's_image",
  "key": "pxi_lab_key",
}

```

## DEVELOPING THE CLIENT SIDE SECTION

### Initializing States

**States:**

```json
const [image, setImage] = useState("");
const [result, setResult] = useState(null);
const [loading, setLoading] = useState(false);
```

### Uploading images use of next-cloudinary

```
**next-cloudinary:**
<CldUploadWidget
multiple
onSuccess={handleUpload}
uploadPreset="dl93zl9fn"
folder="uploads"
sources={["local", "url", "camera"]} >
{({ open }) => {
return (
<div
className="w-full cursor-pointer border-dotted px-4 md:px-8 border-4 border-[rgba(0,0,0,.2)] h-[250px] flex flex-col gap-4 items-center justify-center
"
onClick={() => open()} >
<CiImageOn fontSize={"38px"} />
<span className="text-sm text-center">
Upload a fileNo file chosen or drag and drop PNG, JPG,
GIF up to 10MB
</span>
</div>
);
}}
</CldUploadWidget>

```

### Interacting with Nextjs server

**Logic:**

```json
  const tempKey = "74389de25cb37a10adf615e8a79c8da4";
  const handleTextImage = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/nswft", {
        img: image,
        key: tempKey,
      });
      setResult(data);
      toast.success("Image test successfull!!");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

```

### Setting up the Logic

We make use of tenary operators in checking for conditions in rendering of the images.

So in the first line we are saying that if the state (image) is empty and also the result form the server is not defined we should render the div. This div is also conditioned to check if the score response from the server is 1. If it is 1, then we should display the image without blurring it else we should just blur the image. Else in all of this, we should just return th image when it has not yet being sent to the server

```json
    {image !== "" && result ? (
            <div className="w-full">
              {result?.score === 1 ? (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  src={image}
                  // blurDataURL={image | ""}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              ) : (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  style={{ filter: "blur(10px" }}
                  src={image}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              )}
            </div>
          ) : (
            <>
              {image ? (
                <Image
                  alt="Cotion"
                  width={0}
                  sizes="100vw"
                  height={0}
                  loading="lazy"
                  src={image}
                  // blurDataURL={image | ""}
                  className="h-[250px] w-full md:mx-auto object-cover"
                />
              ) : (
                <CldUploadWidget
                  multiple
                  onSuccess={handleUpload}
                  uploadPreset="dl93zl9fn"
                  folder="uploads"
                  sources={["local", "url", "camera"]}
                >
                  {({ open }) => {
                    return (
                      <div
                        className="w-full cursor-pointer border-dotted px-4  md:px-8 border-4 border-[rgba(0,0,0,.2)] h-[250px] flex flex-col gap-4 items-center justify-center
          "
                        onClick={() => open()}
                      >
                        <CiImageOn fontSize={"38px"} />
                        <span className="text-sm text-center">
                          Upload a fileNo file chosen or drag and drop PNG, JPG,
                          GIF up to 10MB
                        </span>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              )}
            </>
          )}
```
