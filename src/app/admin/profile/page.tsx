import { prisma } from "@/lib/prisma";
import { updateProfile } from "@/actions/profile";
import ImageUploader from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function AdminProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [profile, { saved }] = await Promise.all([
    prisma.profile.findUniqueOrThrow({ where: { id: "singleton" } }),
    searchParams,
  ]);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-extrabold text-foreground">Profile</h1>

      {saved === "1" && (
        <p className="mb-6 max-w-2xl rounded-lg border border-white/10 bg-surface px-4 py-2 text-sm text-foreground">
          Saved.
        </p>
      )}

      <form action={updateProfile} className="flex max-w-2xl flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Full Name</Label>
            <Input name="name" required defaultValue={profile.name} />
          </div>
          <div>
            <Label>Display Name (hero wordmark)</Label>
            <Input name="displayName" required defaultValue={profile.displayName} />
          </div>
          <div>
            <Label>Role</Label>
            <Input name="role" required defaultValue={profile.role} />
          </div>
          <div>
            <Label>Copyright Year</Label>
            <Input name="copyrightYear" type="number" required defaultValue={profile.copyrightYear} />
          </div>
        </div>

        <div>
          <Label>Tagline (hero, short)</Label>
          <Textarea name="tagline" required rows={2} defaultValue={profile.tagline} />
        </div>
        <div>
          <Label>Bio (short)</Label>
          <Textarea name="bioShort" required rows={2} defaultValue={profile.bioShort} />
        </div>
        <div>
          <Label>Bio (long, About page)</Label>
          <Textarea name="bioLong" required rows={4} defaultValue={profile.bioLong} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ImageUploader name="heroPhotoUrl" entity="profile" label="Hero Photo" defaultValue={profile.heroPhotoUrl} />
          <ImageUploader
            name="behindScenesPhotoUrl"
            entity="profile"
            label="Behind the Scenes Photo"
            defaultValue={profile.behindScenesPhotoUrl}
          />
        </div>

        <div>
          <p className="mb-1 block text-xs font-medium text-foreground/80">About Page Photo Grid (4 photos)</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <ImageUploader
                key={i}
                name={`aboutPhoto${i + 1}`}
                entity="profile"
                defaultValue={profile.aboutPhotoUrls[i]}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Behind the Scenes Video URL (optional, embed link)</Label>
            <Input name="behindScenesVideoUrl" defaultValue={profile.behindScenesVideoUrl ?? ""} />
          </div>
          <div>
            <Label>Resume URL</Label>
            <Input name="resumeUrl" defaultValue={profile.resumeUrl ?? ""} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Contact Email</Label>
            <Input name="email" type="email" required defaultValue={profile.email} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input name="phone" defaultValue={profile.phone ?? ""} />
          </div>
          <div>
            <Label>Location</Label>
            <Input name="location" defaultValue={profile.location ?? ""} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Dribbble URL</Label>
            <Input name="dribbbleUrl" defaultValue={profile.dribbbleUrl ?? ""} />
          </div>
          <div>
            <Label>Behance URL</Label>
            <Input name="behanceUrl" defaultValue={profile.behanceUrl ?? ""} />
          </div>
          <div>
            <Label>LinkedIn URL</Label>
            <Input name="linkedinUrl" defaultValue={profile.linkedinUrl ?? ""} />
          </div>
          <div>
            <Label>Instagram URL</Label>
            <Input name="instagramUrl" defaultValue={profile.instagramUrl ?? ""} />
          </div>
          <div>
            <Label>GitHub URL</Label>
            <Input name="githubUrl" defaultValue={profile.githubUrl ?? ""} />
          </div>
        </div>

        <Button type="submit" className="w-fit">Save Profile</Button>
      </form>
    </div>
  );
}
