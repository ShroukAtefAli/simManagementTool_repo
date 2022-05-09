package com.hypercell.orange.simmangment.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Bucket.
 */
@Entity
@Table(name = "bucket")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Bucket implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "bucket_name", nullable = false)
    private String bucketName;

    @NotNull
    @Column(name = "bucket_capacity", nullable = false)
    private Long bucketCapacity;

    @NotNull
    @Column(name = "bucket_type", nullable = false)
    private String bucketType;

    @Column(name = "bucket_description")
    private String bucketDescription;

    @Column(name = "rate_plan")
    private String ratePlan;

    @JsonIgnoreProperties(value = { "bucket", "activeAlerts", "customer" }, allowSetters = true)
    @OneToOne(mappedBy = "bucket")
    private Dial dial;

    @ManyToOne
    @JsonIgnoreProperties(value = { "dials", "buckets" }, allowSetters = true)
    private Customer customer;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Bucket id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBucketName() {
        return this.bucketName;
    }

    public Bucket bucketName(String bucketName) {
        this.setBucketName(bucketName);
        return this;
    }

    public void setBucketName(String bucketName) {
        this.bucketName = bucketName;
    }

    public Long getBucketCapacity() {
        return this.bucketCapacity;
    }

    public Bucket bucketCapacity(Long bucketCapacity) {
        this.setBucketCapacity(bucketCapacity);
        return this;
    }

    public void setBucketCapacity(Long bucketCapacity) {
        this.bucketCapacity = bucketCapacity;
    }

    public String getBucketType() {
        return this.bucketType;
    }

    public Bucket bucketType(String bucketType) {
        this.setBucketType(bucketType);
        return this;
    }

    public void setBucketType(String bucketType) {
        this.bucketType = bucketType;
    }

    public String getBucketDescription() {
        return this.bucketDescription;
    }

    public Bucket bucketDescription(String bucketDescription) {
        this.setBucketDescription(bucketDescription);
        return this;
    }

    public void setBucketDescription(String bucketDescription) {
        this.bucketDescription = bucketDescription;
    }

    public String getRatePlan() {
        return this.ratePlan;
    }

    public Bucket ratePlan(String ratePlan) {
        this.setRatePlan(ratePlan);
        return this;
    }

    public void setRatePlan(String ratePlan) {
        this.ratePlan = ratePlan;
    }

    public Dial getDial() {
        return this.dial;
    }

    public void setDial(Dial dial) {
        if (this.dial != null) {
            this.dial.setBucket(null);
        }
        if (dial != null) {
            dial.setBucket(this);
        }
        this.dial = dial;
    }

    public Bucket dial(Dial dial) {
        this.setDial(dial);
        return this;
    }

    public Customer getCustomer() {
        return this.customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Bucket customer(Customer customer) {
        this.setCustomer(customer);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Bucket)) {
            return false;
        }
        return id != null && id.equals(((Bucket) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Bucket{" +
            "id=" + getId() +
            ", bucketName='" + getBucketName() + "'" +
            ", bucketCapacity=" + getBucketCapacity() +
            ", bucketType='" + getBucketType() + "'" +
            ", bucketDescription='" + getBucketDescription() + "'" +
            ", ratePlan='" + getRatePlan() + "'" +
            "}";
    }
}
